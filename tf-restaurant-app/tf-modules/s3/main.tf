resource "aws_s3_bucket" "main" {
  bucket            = "${var.bucket_name}"
  acl               = "${var.acl}"

  policy = <<EOF
{
  "Id": "bucket_policy_site",
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "bucket_policy_site_main",
      "Action": [
        "s3:GetObject"
      ],
      "Effect": "Allow",
      "Resource": "arn:aws:s3:::${var.bucket_name}/*",
      "Principal": "*"
    }
  ]
}
EOF

  website {
    index_document  = "${var.index-document}"
    error_document  = "${var.error-document}"
  }
}