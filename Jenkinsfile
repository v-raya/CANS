@Library('jenkins-pipeline-utils') _

def app
DOCKER_REGISTRY_CREDENTIALS_ID = '6ba8d05c-ca13-4818-8329-15d41a089ec0'
GITHUB_CREDENTIALS_ID = '433ac100-b3c2-4519-b4d6-207c029a103b'
JENKINS_MANAGEMENT_DOCKER_REGISTRY_CREDENTIALS_ID = '3ce810c0-b697-4ad1-a1b7-ad656b99686e'

switch(env.BUILD_JOB_TYPE) {
  case "master": buildMaster(); break;
  case "acceptance": buildAcceptance(); break;
  case "regression": buildRegression('integration', 'https://web.integration.cwds.io/cans'); break;
  case "regressionStaging": buildRegression('staging','https://staging.cwds.ca.gov/cans'); break;
  default: buildPullRequest();
}

def buildPullRequest() {
  node('linux') {
    try {
      checkoutStage()
      checkForLabel() // shared library
      buildDockerImageStage()
      lintAndUnitTestStages()
      acceptanceTestStage()
      a11yLintStage()
    } catch(Exception exception) {
      currentBuild.result = "FAILURE"
      throw exception
    } finally {
      cleanupStage()
    }
  }
}

def buildMaster() {
  node('linux') {
    try {
      checkoutStage()
      incrementTag() // shared library
      buildDockerImageStage()
      lintAndUnitTestStages()
      acceptanceTestStage()
      a11yLintStage()
      tagRepo() // shared library
      publishImageStage()
      deployToPreintStage()
      updatePreintManifest() // shared library
    } catch(Exception exception) {
      currentBuild.result = "FAILURE"
      throw exception
    } finally {
      cleanupStage()
    }
  }
}

def buildAcceptance() {
  node('preint') {
    try {
      checkoutStage()
      acceptanceTestPreintStage()
      deployToIntegrationStage()
      updateIntegrationManifest() // shared library
    } catch(Exception exception) {
      currentBuild.result = "FAILURE"
      throw exception
    } finally {
      cleanupStage()
    }
  }
}

def buildRegression(nodeName, url) {
  node(nodeName) {
    try {
      checkoutStage()
      regressionTestStage(url)
    } catch(Exception exception) {
      currentBuild.result = "FAILURE"
      throw exception
    } finally {
      cleanupStage()
    }
  }
}

def checkoutStage() {
  stage('Checkout') {
    deleteDir()
    checkout scm
  }
}

def checkForLabel() {
  stage('Verify SemVer Label') {
    checkForLabel('cans')
   } 
}

def incrementTag() {
  stage('Increment Tag') {
    newTag = newSemVer()
  }
}

def buildDockerImageStage() {
  stage('Build Docker Image') {
    app = docker.build("cwds/cans:${env.BUILD_ID}", "-f docker/web/Dockerfile .")
  }
}

def lintAndUnitTestStages() {
  app.withRun("-e CI=true") { container ->
    lintStage(container)
    unitTestStage(container)
  }
}

def lintStage(container) {
  stage('Lint') {
    sh "docker exec -t ${container.id} yarn lint"
    sh "docker exec -t ${container.id} rubocop"
  }
}

def unitTestStage(container) {
  stage('Unit Test') {
    sh "docker exec -t ${container.id} bash -c 'yarn test:coverage'"
    sh "docker exec -t ${container.id} yarn test:rspec"
  }
}

def acceptanceTestStage() {
  stage('Acceptance Test') {
    hostname = sh(returnStdout: true, script: '/sbin/ifconfig eth0 | grep "inet addr:" | cut -d: -f2 | cut -d " " -f1').trim()
    withEnv(["HOST=${hostname}"]) {
      withDockerRegistry([credentialsId: DOCKER_REGISTRY_CREDENTIALS_ID]) {
        sh "docker-compose -f docker-compose.ci.yml build"
        sh "docker-compose -f docker-compose.ci.yml run cans-test-all"
        sh "docker-compose -f docker-compose.ci.yml exec -T cans-test bundle exec rspec spec/acceptance"
      }
    }
  }
}

def a11yLintStage() {
  stage('Accessibility Lint') {
    hostname = sh(returnStdout: true, script: '/sbin/ifconfig eth0 | grep "inet addr:" | cut -d: -f2 | cut -d " " -f1').trim()
    withEnv(["HOST=${hostname}"]) {
      withDockerRegistry([credentialsId: DOCKER_REGISTRY_CREDENTIALS_ID]) {
        sh "docker-compose -f docker-compose.ci.yml exec -T cans-test bundle exec rspec spec/a11y"
      }
    }
  }
}

def tagRepo() {
  stage('Tag Repo'){
    tagGithubRepo(newTag, GITHUB_CREDENTIALS_ID)
  }
}

def acceptanceTestPreintStage() {
  stage('Acceptance Test Preint') {
    withDockerRegistry([credentialsId: JENKINS_MANAGEMENT_DOCKER_REGISTRY_CREDENTIALS_ID]) {
      sh "docker-compose -f docker-compose.ci.yml up -d --build cans-test"
      sh "docker-compose -f docker-compose.ci.yml exec -T  --env CANS_WEB_BASE_URL=https://cans.preint.cwds.io/cans cans-test bundle exec rspec spec/acceptance"
    }
  }
}

def regressionTestStage(url) {
  stage('Regression Test') {
    withDockerRegistry([credentialsId: JENKINS_MANAGEMENT_DOCKER_REGISTRY_CREDENTIALS_ID]) {
      withCredentials([
        string(credentialsId: 'cans-supervisor-username', variable: 'SUPERVISOR_USERNAME'),
        string(credentialsId: 'cans-supervisor-password', variable: 'SUPERVISOR_PASSWORD'),
        string(credentialsId: 'cans-supervisor-verification-code', variable: 'SUPERVISOR_VERIFICATION_CODE'),
        string(credentialsId: 'cans-caseworker-username', variable: 'CASEWORKER_USERNAME'),
        string(credentialsId: 'cans-caseworker-password', variable: 'CASEWORKER_PASSWORD'),
        string(credentialsId: 'cans-caseworker-verification-code', variable: 'CASEWORKER_VERIFICATION_CODE'),
        string(credentialsId: 'cans-non-caseworker-username', variable: 'NON_CASEWORKER_USERNAME'),
        string(credentialsId: 'cans-non-caseworker-password', variable: 'NON_CASEWORKER_PASSWORD'),
        string(credentialsId: 'cans-non-caseworker-verification-code', variable: 'NON_CASEWORKER_VERIFICATION_CODE'),
        ]) {        
        sh "docker-compose -f docker-compose.ci.yml up -d --build cans-test"
        try {
          sh "docker-compose -f docker-compose.ci.yml exec -T --env NON_CASEWORKER_USERNAME=$NON_CASEWORKER_USERNAME --env NON_CASEWORKER_PASSWORD=$NON_CASEWORKER_PASSWORD --env NON_CASEWORKER_VERIFICATION_CODE=$NON_CASEWORKER_VERIFICATION_CODE --env SUPERVISOR_USERNAME=$SUPERVISOR_USERNAME --env SUPERVISOR_PASSWORD=$SUPERVISOR_PASSWORD --env SUPERVISOR_VERIFICATION_CODE=$SUPERVISOR_VERIFICATION_CODE --env CASEWORKER_USERNAME=$CASEWORKER_USERNAME --env CASEWORKER_PASSWORD=$CASEWORKER_PASSWORD --env CASEWORKER_VERIFICATION_CODE=$CASEWORKER_VERIFICATION_CODE --env REGRESSION_TEST=true --env CANS_WEB_BASE_URL=${url} cans-test bundle exec rspec spec/regression --format html --out regression-report/index.html"
        } finally {
          publishHTML([
                   allowMissing         : true,
                   alwaysLinkToLastBuild: true,
                   keepAll              : true,
                   reportDir            : 'regression-report',
                   reportFiles          : 'index.html',
                   reportName           : 'Regression Tests Report',
                   reportTitles         : 'Regression Tests Report'
          ])
        }
      }
    }
    
  }
}

def publishImageStage() {
  stage('Publish to Dockerhub') {
    withDockerRegistry([credentialsId: DOCKER_REGISTRY_CREDENTIALS_ID]) {
      app.push(newTag)
      app.push('latest')
    }
  }
  stage('Trigger Security scan') {
    build job: 'tenable-scan', parameters: [
        [$class: 'StringParameterValue', name: 'CONTAINER_NAME', value: 'cans'],
        [$class: 'StringParameterValue', name: 'CONTAINER_VERSION', value: newTag]
    ]
  }
}

def deployToPreintStage() {
  stage('Deploy to Preint') {
    withCredentials([usernameColonPassword(credentialsId: 'fa186416-faac-44c0-a2fa-089aed50ca17', variable: 'jenkinsauth')]) {
      sh "curl -u $jenkinsauth 'http://jenkins.mgmt.cwds.io:8080/job/preint/job/deploy-cans/buildWithParameters?token=deployPreint&version=${newTag}'"
    }
  }
}

def updatePreintManifest() {
  stage('Update Pre-int manifest') {
    updateManifest("cans", "preint", GITHUB_CREDENTIALS_ID, newTag)
  }
}

def deployToIntegrationStage() {
  stage('Deploy Integration') {
    build job: '/Integration Environment/deploy-cans/',
          parameters: [
            string(name: 'APP_VERSION', value : "${APP_VERSION}"),
            string(name: 'inventory', value: 'inventories/integration/hosts.yml')
          ],
          wait: false
  }
}

def updateIntegrationManifest() {
  stage('Update Integration manifest') {
    updateManifest("cans", "integration", GITHUB_CREDENTIALS_ID, env.APP_VERSION)
  }
}

def cleanupStage() {
  stage('Cleanup') {
    sh "ls -la"
    sh "docker-compose -f docker-compose.ci.yml down"
    cleanWs()
  }
}
