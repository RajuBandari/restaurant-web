variable "name" {
  description   = "application load balancer"
  default       = "aws_alb"
}

variable "subnets" {
  description   = "VPC subnets for alb"
  default       = []
}

variable "security_groups" {
  description   = "security group for alb"
  default       = []
}

variable "tg_name" {
  description   = "target group name"
  default       = "alb-tg"
}

variable "tg_port" {
  default       = 80
}

variable "tg_protocol" {
  default       = "HTTP"
}

variable "vpc_id" {
  description   = "vpc for alb"
}

variable "target_type" {
  default       = "ip"
}

variable "listener_port" {
  default       = 80
}

variable "listener_protocol" {
  default       = "HTTP"
}
