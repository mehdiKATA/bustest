FROM php:8.2-apache

# Copy your PHP and static files to Apache web root
COPY . /var/www/html/

# Expose port 80
EXPOSE 80
