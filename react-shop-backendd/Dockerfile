FROM postgres:16
ENV POSTGRES_USER=shop \
	POSTGRES_PASSWORD=pass \
	POSTGRES_DB=shop
COPY init.sql /docker-entrypoint-initdb.d/
