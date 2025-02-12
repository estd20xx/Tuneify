#!/usr/bin/env bash

gitMessage="$1"
if [ $# -eq 0 ]; then
    echo "Please Enter Your git message."
    read -p "Press Enter to exits"
    exit 1
fi
function checkCommandStatus {
    if [ $? -eq 0 ]; then
        echo -e "\n $1 executed successfully"
    else
        echo -e "\n $1 error"
    fi
}
function projectPrettify {
    echo -e "\n Prettifying project\n"
    yarn run format
}
function pushToDevelopmentBranch {
    git push origin features
    checkCommandStatus "Git push"
}
function addingToGitStage {
    git pull origin features
    checkCommandStatus "Git pull"
    git add .
    checkCommandStatus "Git add"
    echo "'$1'"
    git commit -m "$1"
    checkCommandStatus "git commit"
    
}


function makeGitCommit {
    projectPrettify
    checkCommandStatus "Prettifying "
}
makeGitCommit
addingToGitStage "$gitMessage"
pushToDevelopmentBranch
read -p "Press Enter to exits"