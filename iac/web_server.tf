resource "aws_instance" "web_server" {
  ami                    = "ami-0889a44b331db0194" # amazon linux
  instance_type          = "t2.micro"
  iam_instance_profile   = aws_iam_instance_profile.resources-iam-profile.name
  subnet_id              = aws_subnet.public_subnet_1.id
  vpc_security_group_ids = [aws_security_group.web_security_group.id]
  user_data              = <<-EOF
    #!/bin/bash
    dnf update -y
    yum install -y https://s3.amazonaws.com/ec2-downloads-windows/SSMAgent/latest/linux_amd64/amazon-ssm-agent.rpm
    systemctl start amazon-ssm-agent
    systemctl enable amazon-ssm-agent
    dnf install -y wget postgresql15
  EOF
}
