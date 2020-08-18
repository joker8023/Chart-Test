FROM python:3.6
WORKDIR /source
COPY ./requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY . ./
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN echo "Asia/Shanghai" > /etc/timezone
RUN dpkg-reconfigure -f noninteractive tzdata
CMD  python manage.py db upgrade; uwsgi uwsgi.ini