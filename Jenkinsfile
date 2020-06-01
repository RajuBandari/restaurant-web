pipeline {
   agent any

   stages {
      stage('Clone Repository') {
         checkout scm
      }
      
      stage('Build Image') {
          steps {
            script {
               dockerImage = docker.build registry + ":$BUILD_NUMBER"
            }
         }
      }
      
      stage('Test Image') {
          steps {
            echo 'deploying'
         }
      }
      
      stage('Push Image') {
          steps {
            echo 'monotoring'
         }
      }
      
      stage('Deployment') {
          steps {
            echo 'load test'
         }
      }

      stage('smoke test') {
          steps {
            echo 'load test'
         }
      }
   }
   
   post {
       success {
           echo 'this is success report'
       }
       
       failure {
           echo 'this is failure report'
       }
   }
}