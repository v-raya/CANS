FROM cwds/cans_testing_base_image:3
RUN apt-get install -y netcat
WORKDIR /app
RUN chromedriver-update 2.42
ADD . /app
RUN gem install bundler -v 1.17.3 && bundle install
# Install Xvfb init script
ENV DISPLAY :99
ADD docker/test/run.sh /run.sh
RUN chmod a+x /run.sh
CMD /run.sh
