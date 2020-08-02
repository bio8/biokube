ARG RUBY_VERSION=2.6.1

FROM ruby:$RUBY_VERSION-alpine AS development

RUN apk add --no-cache \
    git build-base nodejs \
    tzdata \
    && rm -rf /var/cache/apk/* 

ENV RAILS_ENV=development
ENV RACK_ENV=development
ENV RAILS_LOG_TO_STDOUT=true
ENV RAILS_ROOT=/srv/docs
ENV LANG=C.UTF-8
ENV GEM_HOME=/bundle
ENV BUNDLE_PATH=$GEM_HOME
ENV BUNDLE_APP_CONFIG=$BUNDLE_PATH
ENV BUNDLE_BIN=$BUNDLE_PATH/bin
ENV PATH=/srv/docs/bin:$BUNDLE_BIN:$PATH

WORKDIR /srv/docs

VOLUME /srv/docs/src
EXPOSE 4567

COPY . /srv/docs

RUN gem install bundler \
    && bundle install -j "$(getconf _NPROCESSORS_ONLN)"  \
    && rm -rf $BUNDLE_PATH/cache/*.gem \
    && find $BUNDLE_PATH/gems/ -name "*.c" -delete \
    && find $BUNDLE_PATH/gems/ -name "*.o" -delete  

RUN chown -R 1000:1000 /srv/docs

USER 1000

CMD ["bundle", "exec", "middleman", "server", "--watcher-force-polling"]
