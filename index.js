import { S3Client, ListObjectsV2Command, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";

const client = new S3Client({
  region: "us-west-2"
});


export const getItemsInBucket = async () => {
  const command = new ListObjectsV2Command({
    Bucket: "image-holder-lab17",
    // The default and maximum number of keys returned is 1000. This limits it to
    // one for demonstration purposes.
    MaxKeys: 1,
  });

  try {
    let isTruncated = true;

    console.log("Your bucket contains the following objects:\n")
    let contents = "";

    while (isTruncated) {
      const { Contents, IsTruncated, NextContinuationToken } = await client.send(command);
      const contentsList = Contents.map((c) => ` • ${c.Key}`).join("\n");
      contents += contentsList + "\n";
      isTruncated = IsTruncated;
      command.input.ContinuationToken = NextContinuationToken;
    }
    console.log(contents);

  } catch (err) {
    console.log('None')
  }
};

export const putImage = async () => {
  const command = new PutObjectCommand({
    Bucket: "image-holder-lab17",
    Key: "images.json",
    Body: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80",
    Type: "jpg"
  });

  try {
    await client.send(command);
  } catch (err) {
    console.log(err)
  }
};






putImage();
getItemsInBucket();

