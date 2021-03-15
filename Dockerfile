FROM python:3.9.2

# Environment Variables Settings
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Working Directory Settings
RUN mkdir /code
WORKDIR /code

# Installing Python packages
RUN pip install --upgrade pip
COPY requirements.txt /code/
RUN apt-get update -y && apt-get install build-essential python3-dev -y
RUN pip install -r requirements.txt --no-binary :all:
#--no-deps

# Moving over the files to the directory
COPY . /code/