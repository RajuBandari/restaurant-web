output "private_subnets" {
  value = "${aws_subnet.private-a.id}"
}

output "public_subnets" {
  value = ["${aws_subnet.public-a.id}", "${aws_subnet.public-c.id}"]
}

output "vpc_id" {
  value = "${aws_vpc.main.id}"
}


