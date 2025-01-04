with open("../../android/app/build.gradle") as file:
    content = file.read()
    if(content.startswith("versionName")):
        print("yes")