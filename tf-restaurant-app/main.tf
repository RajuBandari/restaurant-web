provider "aws" {
  region         = "${var.aws_region}"
  access_key     = "${var.aws_access_key}"
  secret_key     = "${var.aws_secret_key}"
}

module "http-server" {
    source       = "./http-server"
}

module "web-app" {
    source       = "./web-app"
    bucket_name  = "restaurant-react-app"
}

