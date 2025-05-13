FROM python:3.9

WORKDIR /var/www/olympiad.falpin.ru

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["gunicorn", "--bind", "0.0.0.0:8200", "--workers", "4", "--user", "root", "server:app"]