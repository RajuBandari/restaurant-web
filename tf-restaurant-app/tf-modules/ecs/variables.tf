variable "cluster-name" {
  description = "ecs cluster name"
  default     = "tf-ecs-cluster"
}

variable "task-family" {
  description = "task family"
  default     = "ecs-task-family"
}

variable "network_mode" {
  default = "awsvpc"
}

variable "container-port" {
  default = 3000
}

variable "host-port" {
  default = 3000
}




variable "container-name" {
  description = "ecs container name"
  default     = "NGINX"
}

variable "ecs_service_name" {
  description = "ecs task service name"
  default = "aws_ecs_service"
}




variable "image" {
  description = "Docker container image to run on fargate cluster",
  default = "nginx:1.13.9-alpine"
}

variable "num_of_containers" {
  description = "Number of docker containers run on cluster"
  default     = 2
}

variable "port" {
  description = "docker image port"
  default = 3000
}

variable "cpu" {
  description = "Fargate instance CPU units to provision (1 vCPU = 1024 CPU units)"
  default     = 256
}

variable "memory" {
  description = "Fargate instance memory to provision (in MiB)"
  default     = 512
}

variable "alb_listener_id" {
  description = "alb listener"
}

variable "private_subnets" {
  description = "subnets for ecs container hosting"
}

variable "sg" {
  description = "security group for ecs"
}

variable "target_group_id" {
  description = "alb target group location"
}







