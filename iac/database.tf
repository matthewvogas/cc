resource "aws_db_instance" "codecoco_db" {
  identifier             = "codecoco-db"
  allocated_storage      = 20
  engine                 = "postgres"
  engine_version         = "15.2"
  instance_class         = "db.t3.micro"
  db_name                = "codecoco_db"
  username               = var.db_username
  password               = var.db_password
  skip_final_snapshot    = true
  vpc_security_group_ids = [aws_security_group.postgres_security_group.id]
  db_subnet_group_name   = aws_db_subnet_group.db_subnet_group.name
}
