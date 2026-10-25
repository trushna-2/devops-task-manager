
pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'call npm install'
            }
        }

        stage('Build') {
            steps {
                bat 'call npm run build'
            }
        }

        stage('Automated Testing') {
            steps {
                bat 'call npm test'
            }
        }
    }
}
