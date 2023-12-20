# Use an official PostgreSQL runtime as a parent image
FROM grafana/grafana:10.0.0
LABEL authors="Sanghyeok"

# Set the working directory in the container to /docker-entrypoint-initdb.d

# Copy the current directory contents into the container at /docker-entrypoint-initdb.d
COPY . /usr/share/grafana

# Make port 3000 available to the world outside this container
EXPOSE 3000

# run grafana when the container launches
CMD ["grafana-server", "-config", "/usr/share/grafana/conf/defaults.ini", "-homepath", "/usr/share/grafana"]