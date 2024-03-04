
resource "mongodbatlas_cluster" "cluster" {
  project_id = var.project_id
  name       = "rd-dev"

  cluster_type = "REPLICASET"
  replication_specs {
    num_shards = 1
    zone_name  = "Zone 1"
    regions_config {
      region_name     = "EU_WEST_2"
      electable_nodes = 3
      priority        = 7
      read_only_nodes = 0
    }
  }
  cloud_backup                 = false
  auto_scaling_disk_gb_enabled = true
  mongo_db_major_version       = "7.2"

  # Provider Settings "block"
  provider_name               = "AWS"
  provider_instance_size_name = "M10"

  tags {
    key   = "environment"
    value = "development"
  }
}
