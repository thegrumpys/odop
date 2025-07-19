import { useState } from "react";
import { useSelector } from "react-redux";
import { NavDropdown } from 'react-bootstrap';
import { displayMessage } from '../../components/Message';
import { displaySpinner } from '../../components/Spinner';
import { logUsage } from '../../logUsage';
import config from '../../config';
import axios from '../../axiosConfig';
//import { JSZip } from 'jszip';
var JSZip = require("jszip");

export default function FileDownloadAll() {
//  console.log('FileDownloadAll - Mounting...');
  const user = useSelector((state) => state.user);
//  console.log('user=',user);

  const downloadFile = (model, file_name, file_type) => {
//    console.log('In FileDownloadAll.downloadFile','model=',model,'file_name=',file_name,'file_type=',file_type);
    const url = window.URL.createObjectURL(model);
//    console.log('In FileDownloadAll.downloadFile','url=', url);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', file_name.trim() + '.' + file_type);
//    console.log('In FileDownloadAll.downloadFile','link=', link);
    document.body.appendChild(link);
    link.click();
  }

  const onDownloadAll = async () => {
    if (user === null) {
      displayMessage('Sign in so your files for download are accessible.');
      return;
    }
    try {
      displaySpinner(true);
      let currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
      const day = currentDate.getDate().toString().padStart(2, '0');
      const hours = currentDate.getHours().toString().padStart(2, '0');
      const minutes = currentDate.getMinutes().toString().padStart(2, '0');
      const seconds = currentDate.getSeconds().toString().padStart(2, '0');
      const topLevel = `odop_download_all_${year}${month}${day}_${hours}${minutes}${seconds}`;

      const allFileContentPromises = [];

      var zip = new JSZip();
      // Get a list of all types - config.env.types
      var types = config.env.types;
//      console.log('user=',user,'types=',types);
      for (const type of types) {
        // For each type
//        console.log('type=',type);

        // Step 1: fetch file names for this type
        const fileListResponse = await axios.get('/api/v1/designtypes/' + encodeURIComponent(type) + '/designs', {
          headers: {
            Authorization: 'Bearer ' + user
          }
        })
        let fileNames = fileListResponse.data; // assume array of file names
        fileNames = fileNames.filter(fileName => fileName.user !== null);
//        console.log('fileNames=',fileNames);

        // Step 2: fetch each file and keep filename association
        const fileContentPromises = fileNames.map(async (fileName) => {
//          console.log('fileName=',fileName);
          const response = await axios.get('/api/v1/designtypes/' + encodeURIComponent(type) + '/designs/' + encodeURIComponent(fileName.name), {
            headers: {
              Authorization: 'Bearer ' + user
            }
          })
//          console.log('response=',response);
          const fileContent = response.data; // or use .arrayBuffer(), etc.
//          console.log('fileContent=',fileContent);
          return {
            fileName: `${topLevel}/${type}/${fileName.name.trim()}`,
            fileContent
          };
        });

        allFileContentPromises.push(...fileContentPromises);
      }

      // Step 3: resolve all fetches
      const fileData = await Promise.all(allFileContentPromises);
//      console.log('fileData=',fileData);
      if (fileData.length === 0) {
        displayMessage('No files for download were found.');
        return;
      }
      for (const fileDatum of fileData) {
        zip.file(fileDatum.fileName + '.json', JSON.stringify(fileDatum.fileContent, null, 2));
      }

      // Download the Blob
      zip.generateAsync({
        type:"blob",
        compression: "DEFLATE",
        compressionOptions: {
            level: 9
        }
      })
      .then(function(content) {
//        console.log('content=',content);
        downloadFile(content, topLevel, 'zip');
        logUsage('event', 'FileDownloadAll', { event_label: '' });
      });
    } catch (error) {
      displayMessage('Error fetching and downloading files for download: ' + error);
    } finally {
      displaySpinner(false);
    }
  }

  return (
    <>
      <NavDropdown.Item onClick={onDownloadAll}>
        Download All
      </NavDropdown.Item>
    </>
  );
}
