# Use official PHP image with Apache
FROM php:8.2-apache

# Install mysqli extension
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli

# Optional: Install other useful PHP extensions (uncomment if needed)
# RUN docker-php-ext-install pdo pdo_mysql

# Copy your app files into the web root
COPY . /var/www/html/

# Set proper permissions (optional, depending on your app)
RUN chown -R www-data:www-data /var/www/html

# Expose port 80 to the outside world
EXPOSE 80

# Start Apache in the foreground (default command in this image)
CMD ["apache2-foreground"]
