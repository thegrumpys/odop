import { useState } from "react";
import { useSelector } from "react-redux";
import { NavDropdown } from 'react-bootstrap';
import { displayMessage } from '../../components/Message';
import { displaySpinner } from '../../components/Spinner';
import { logUsage } from '../../logUsage';
import config from '../../config';
//import { JSZip } from 'jszip';
var JSZip = require("jszip");

export default function FileExportAll() {
//  console.log('FileExportAll - Mounting...');
  const user = useSelector((state) => state.user);
  console.log('user=',user);

  const exportFile = (model, name, file_type) => {
//        console.log('In FileExportAll.exportFile model=',model);
    const url = window.URL.createObjectURL(model);
//        console.log('In FileExportAll.exportFile','url=', url);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', name + '.' + file_type);
//        console.log('In FileExportAll.exportFile','link=', link);
    document.body.appendChild(link);
    link.click();
  }


  const onExportAll = async () => {
    try {
      const allFileContentPromises = [];

      var zip = new JSZip();
      // Get a list of all types - config.env.types
      var types = config.env.types;
      console.log('user=',user,'types=',types);
      for (const type of types) {
        // For each type
        console.log('type=',type);

        // Step 1: fetch file names for this type
        const fileListResponse = await fetch('/api/v1/designtypes/' + encodeURIComponent(type) + '/designs', {
          headers: {
            Authorization: 'Bearer ' + user
          }
        })
        let fileNames = await fileListResponse.json(); // assume array of file names
        fileNames = fileNames.filter(fileName => fileName.user !== null);
        console.log('fileNames=',fileNames);

        // Step 2: fetch each file and keep filename association
        const fileContentPromises = fileNames.map(async (fileName) => {
          console.log('fileName=',fileName);
          const response = await fetch('/api/v1/designtypes/' + encodeURIComponent(type) + '/designs/' + encodeURIComponent(fileName.name), {
            headers: {
              Authorization: 'Bearer ' + user
            }
          })
          console.log('response=',response);
          if (!response.ok) throw new Error(`Failed to fetch ${type}/${fileName.name}`);
          const fileContent = await response.json(); // or use .arrayBuffer(), etc.
          console.log('fileContent=',fileContent);
          return {
            fileName: `${type}/${fileName.name}`,
            fileContent
          };
        });

        allFileContentPromises.push(...fileContentPromises);
      }

      // Step 3: resolve all fetches
      const fileData = await Promise.all(allFileContentPromises);
      console.log('fileData=',fileData);
      for (const fileDatum of fileData) {
        zip.file(fileDatum.fileName + '.json', new Blob([JSON.stringify(fileDatum.fileContent, null, 2)]));
      }
      // Download the Blob
      zip.generateAsync({type:"blob"})
      .then(function(content) {
        console.log('content=',content);
        exportFile(content, 'odop_export_all', 'zip');
        logUsage('event', 'FileExportAll', { event_label: '' });
      });
    } catch (error) {
      console.error('Error fetching files:', error);
      throw error;
    }
  }

  return (
    <>
      <NavDropdown.Item onClick={onExportAll}>
        Export All
      </NavDropdown.Item>
    </>
  );
}
