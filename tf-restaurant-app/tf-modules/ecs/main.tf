
# ECS (fargate)
resource "aws_ecs_cluster" "main" {
  name  = "${var.cluster-name}"
}

resource "aws_ecs_task_definition" "main" {
  family                   = "${var.task-family}"
  network_mode             = "${var.network_mode}"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "${var.cpu}"
  memory                   = "${var.memory}"

  container_definitions = <<DEFINITION
[
  {
    "cpu": ${var.cpu},
    "image": "${var.image}",
    "memory": ${var.memory},
    "name": "${var.container-name}",
    "networkMode": "${var.network_mode}",
    "portMappings": [
      {
        "containerPort": ${var.container-port},
        "hostPort": ${var.host-port}
      }
    ]
  }
]
DEFINITION
}

resource "null_resource" "alb_listener" {
  triggers = {
    deps = "${var.alb_listener_id}"
  }
}

resource "aws_ecs_service" "main" {
  name            = "${var.ecs_service_name}"
  cluster         = "${aws_ecs_cluster.main.id}"
  task_definition = "${aws_ecs_task_definition.main.arn}"
  desired_count   = "${var.num_of_containers}"
  launch_type     = "FARGATE"

  network_configuration {
    security_groups = ["${var.sg}"]
    subnets         = ["${var.private_subnets}"]
  }

  load_balancer {
    target_group_arn = "${var.target_group_id}"
    container_name   = "${var.container-name}"
    container_port   = "${var.container-port}"
  }

  depends_on = [
    "null_resource.alb_listener"
  ]
}