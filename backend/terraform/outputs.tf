output "mongodb_uri" {
  value = mongodbatlas_cluster.cluster.connection_strings.standard_srv
}

output "s3" {
  value = aws_s3_bucket.bucket.bucket
}
