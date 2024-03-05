# Configure the MongoDB Atlas Provider 
provider "mongodbatlas" {
  public_key  = var.mongodbatlas_public_key
  private_key = var.mongodbatlas_private_key
}

provider "aws" {
  # Configuration options
  region = "eu-west-2"
}
