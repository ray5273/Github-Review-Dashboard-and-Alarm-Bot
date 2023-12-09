# Use an official PostgreSQL runtime as a parent image
FROM postgres:15.3
LABEL authors="Sanghyeok"

# Set the working directory in the container to /docker-entrypoint-initdb.d
WORKDIR /docker-entrypoint-initdb.d

# Copy the current directory contents into the container at /docker-entrypoint-initdb.d
COPY . /docker-entrypoint-initdb.d

# Make port 5432 available to the world outside this container
EXPOSE 5432

# Run init.sql when the container launches
CMD ["postgres"]