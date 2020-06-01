resource "aws_security_group" "main" {
        name        = "${var.name}"
        description = "${var.desc}"
        vpc_id      = "${var.vpc_id}"

  ingress {
        protocol    = "${var.ingress_protocol}"
        from_port   = "${var.ingress_from_port}"
        to_port     = "${var.ingress_to_port}"
        cidr_blocks = "${var.ingress_cidr_blocks}"
    security_groups = ["${var.security_groups}"]
  }

  egress {
        from_port   = "${var.egress_from_port}"
        to_port     = "${var.egress_to_port}"
        protocol    = "${var.egress_protocol}"
        cidr_blocks = "${var.egress_cidr_blocks}"
  }
}