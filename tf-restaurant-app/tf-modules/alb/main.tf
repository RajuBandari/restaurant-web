# Application Load Balancer
resource "aws_alb" "main" {
  name            = "${var.name}"
  subnets         = ["${var.subnets}"]
  security_groups = ["${var.security_groups}"]
}

# ALB target group
resource "aws_alb_target_group" "main" {
  name            = "${var.tg_name}"
  port            = "${var.tg_port}"
  protocol        = "${var.tg_protocol}"
  vpc_id          = "${var.vpc_id}"
  target_type     = "${var.target_type}"
}

#ALB listeners
resource "aws_alb_listener" "main" {
  load_balancer_arn = "${aws_alb.main.id}"
  port              = "${var.listener_port}"
  protocol          = "${var.listener_protocol}"

  default_action {
    target_group_arn = "${aws_alb_target_group.main.id}"
    type             = "forward"
  }
}
