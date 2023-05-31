resource "aws_lb" "load_balancer" {
  name               = "web-load-balancer"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.web_security_group.id]
  subnets = [
    aws_subnet.public_subnet_1.id,
    aws_subnet.public_subnet_2.id
  ]
}

resource "aws_lb_target_group" "web_lb_target_group" {
  name     = "web-lb-target-group"
  port     = 80
  protocol = "HTTP"
  vpc_id   = aws_vpc.codecoco_vpc.id
}

resource "aws_lb_listener" "web_lb_listener" {
  load_balancer_arn = aws_lb.load_balancer.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.web_lb_target_group.arn
  }
}

resource "aws_lb_target_group_attachment" "web_lb_target_group_attachment" {
  target_group_arn = aws_lb_target_group.web_lb_target_group.arn
  target_id        = aws_instance.web_server.id
  port             = 80
}
