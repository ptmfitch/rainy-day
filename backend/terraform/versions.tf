terraform {
  required_providers {
    mongodbatlas = {
      source  = "mongodb/mongodbatlas"
      version = "1.15.1"
    }

    aws = {
      source  = "hashicorp/aws"
      version = "5.39.1"
    }
  }
}
