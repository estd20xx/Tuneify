#!/usr/bin/env bash

echo "+================================================+"
echo "|           creating android release             |"
echo "+================================================+"
releaseDirectory="android/app/build/outputs/apk/release"
androiddDir="android/app"
function formatFiles {
    echo "+-$(printf -- '-%.0s' {1..77})"
}
function checkFolderExists {
    echo "+================================================+"
    echo "|           checking if folder exists            |"
    echo "+================================================+"
    if [ ! -d "$1" ]; then
        echo "Error: Directory '$1' does not exist."
        wantsExit
    fi
    echo -e "\nchecking folder $1 Done"
    makeAndroidBuild
}

function showApks {
    files=("$releaseDirectory"/*)
    
    if [ ${#files[@]} -eq 0 ]; then
        echo -e "\n\nNo files found in directory '$releaseDirectory'."
        wantsExit
    fi
    
    echo -e "\n\n Files in directory '$releaseDirectory':"
    for file in "${files[@]}"; do
        formatFiles
        echo "| $file"
    done
    wantsExit
}
function projectPrettify {
    echo -e "\n Prettifying project\n"
    yarn run format
}
function makeAndroidBuild {
    projectPrettify
    echo -e "\nGenerating android apks"
    chmod +x android/gradlew
    yarn run build:release
    echo -e "\n Androind apks generated..."
    showApks
}

function wantsExit {
    read -p "Press Enter to exit"
    exit 1
}
checkFolderExists "$androiddDir"