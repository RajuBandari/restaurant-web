variable "bucket_name" {
  description   = "s3 bucket name"
  default       = "web_bucket" 
}

variable "acl" {
  description   = "access control"
  default       = "public-read" 
}

variable "index-document" {
  description   = "index page for public hosting"
  default       = "index.html" 
}

variable "error-document" {
  description   = "error page"
  default       = "index.html" 
}


