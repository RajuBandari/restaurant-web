
module "resturant_vpc" {
    source      =   "../tf-modules/vpc" 
}

module "alb_sg" {
    source      = "../tf-modules/sg"
    name        = "restaurant-alb-sg"
    desc        = "security group for ALB"
    vpc_id      = "${module.resturant_vpc.vpc_id}"
    ingress_protocol = "tcp"
    ingress_from_port = 80
    ingress_from_port = 80
    egress_to_port    = 0
    egress_to_port    = 0
    egress_protocol   = -1
}

module "ecs_sg" {
    source      =   "../tf-modules/sg"
    name        = "restaurant-ecs-sg"
    desc        = "allow inbound access from the ALB only"
    vpc_id      = "${module.resturant_vpc.vpc_id}"
    ingress_protocol = "tcp"
    ingress_from_port = 80
    ingress_from_port = 80
    egress_to_port    = 0
    egress_to_port    = 0
    egress_protocol   = -1
    security_groups   = ["${module.alb_sg.sg_id}"]
}

module "restaurant_alb" {
    source      = "../tf-modules/alb"
    name        = "restaurant-alb"
    subnets     = "${module.resturant_vpc.public_subnets}"
    security_groups = ["${module.alb_sg.sg_id}"]
    vpc_id      = "${module.resturant_vpc.vpc_id}"
}

module "restaurant_ecs" {
    source          = "../tf-modules/ecs"
    cluster-name    = "restaurant-app-cluster"
    alb_listener_id = "${module.restaurant_alb.alb_listener_id}"
    private_subnets = "${module.resturant_vpc.private_subnets}"
    sg              = "${module.ecs_sg.sg_id}"
    target_group_id = "${module.restaurant_alb.aws_alb_target_group}"
}
