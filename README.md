# image-lambda

When an image is uploaded to the "images" folder in a cloud storage service, a Lambda function is triggered to listen for events in that folder. The Lambda function retrieves the uploaded image's name and location and looks for an "images.json" file which contains metadata about all the images in the folder. If the "images.json" file exists, the Lambda function parses it and adds metadata for the newly uploaded image. If it does not exist, the Lambda function creates it and adds metadata for the new image. Once the metadata has been added, the Lambda function saves the updated "images.json" file in the cloud storage service. This process ensures that the "images.json" file is always up to date with the metadata for all images in the folder, allowing for easier management and organization of the images.

Some issues I ran into were IAM issues as well as just using AWS

https://s3.console.aws.amazon.com/s3/object/image-holder-lab17?region=us-west-2&prefix=images.json