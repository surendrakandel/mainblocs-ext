
import * as zip from "jszip";
export function unzipBlob(blob:any) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function() {
            const binaryData = reader.result;
            // @ts-ignore
            zip.loadAsync(binaryData).then(zip => {
                // Assuming there's a single file in the ZIP
                const firstFileName = Object.keys(zip.files)[0];
                zip.files[firstFileName].async('string').then(content => {
                    resolve(content);
                });
            }).catch(err => {
                reject(new Error("Error reading zip contents: " + err.message));
            });
        };

        reader.onerror = function() {
            reject(new Error("Error reading the Blob."));
        };

        reader.readAsArrayBuffer(blob);
    });
}
