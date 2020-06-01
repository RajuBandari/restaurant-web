# should be optimized
resource "aws_vpc" "main" {
  cidr_block = "${var.cidr_block}"
}

# Subnets
resource "aws_subnet" "private-a" {
  count             = 1
  cidr_block        = "10.0.0.0/28"
  availability_zone = "us-east-1a"
  vpc_id            = "${aws_vpc.main.id}"
}

resource "aws_subnet" "private-c" {
  count             = 1
  cidr_block        = "10.0.0.16/28"
  availability_zone = "us-east-1c"
  vpc_id            = "${aws_vpc.main.id}"
}

resource "aws_subnet" "public-a" {
  count                   = 1
  cidr_block              = "10.0.0.32/28"
  availability_zone       = "us-east-1a"
  vpc_id                  = "${aws_vpc.main.id}"
  map_public_ip_on_launch = true
}

resource "aws_subnet" "public-c" {
  count                   = 1
  cidr_block              = "10.0.0.48/28"
  availability_zone       = "us-east-1c"
  vpc_id                  = "${aws_vpc.main.id}"
  map_public_ip_on_launch = true
}

# Internet Gateway
resource "aws_internet_gateway" "main" {
  vpc_id = "${aws_vpc.main.id}"
}

# Internet access through IGW
resource "aws_route" "internet_access" {
  route_table_id         = "${aws_vpc.main.main_route_table_id}"
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = "${aws_internet_gateway.main.id}"
}

# NAT gateway -Intenet access for private subnets through public network and IGW
resource "aws_eip" "main" {
  vpc        = true
  depends_on = ["aws_internet_gateway.main"]
}

resource "aws_nat_gateway" "main" {
  subnet_id     = "${aws_subnet.public-a.id}"
  allocation_id = "${aws_eip.main.id}"
}

# Route Tables
resource "aws_route_table" "private_RT" {
  count             = 1
  vpc_id            = "${aws_vpc.main.id}"

  route {
    cidr_block = "0.0.0.0/0"
    nat_gateway_id = "${aws_nat_gateway.main.id}"
  }
}

# subnet association
resource "aws_route_table_association" "private-a" {
  subnet_id      = "${aws_subnet.private-a.id}"
  route_table_id = "${aws_route_table.private_RT.id}"
}

resource "aws_route_table_association" "private-c" {
  subnet_id      = "${aws_subnet.private-c.id}"
  route_table_id = "${aws_route_table.private_RT.id}"
}

