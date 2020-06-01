output "alb_listener_id" {
  value = "${aws_alb_listener.main.id}"
}

output "alb_dns_name" {
  value = "${aws_alb.main.dns_name}"
}

output "aws_alb_target_group" {
  value = "${aws_alb_target_group.main.id}"
}

