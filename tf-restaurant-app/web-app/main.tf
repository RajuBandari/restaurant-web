
module "react-app-s3-bucket" {
    source          =   "../tf-modules/s3"
    bucket_name     = "${var.bucket_name}"
    acl             = "${var.acl}"
    index-document  = "${var.index-document}"
    error-document  = "${var.error-document}"
}