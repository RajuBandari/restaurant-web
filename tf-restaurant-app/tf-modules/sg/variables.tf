variable "name" {
  description = "security group name"
  default     = "aws_sg"
}

variable "desc" {
  description = "security group description"
  default     = "default description"
}

variable "vpc_id" {
  description = "aws vpc id"
}

variable "ingress_protocol" {
  description = "protocol"
  default     = "tcp"
}

variable "egress_protocol" {
  description = "protocol"
  default     = "-1"
}

variable "ingress_to_port" {
  default     = 80
}

variable "ingress_from_port" {
  default     = 80
}

variable "egress_to_port" {
  default     = 0
}

variable "egress_from_port" {
  default     = 0
}

variable "ingress_cidr_blocks" {
  default     = ["0.0.0.0/0"]
}

variable "egress_cidr_blocks" {
  default     = ["0.0.0.0/0"]
}

variable "security_groups" {
  description = "ingress security groups"
  default = []
}






