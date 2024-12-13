
  
  /**
   * TODO:
   * - Refactor callback ke Promise atau Async Await
   * - Refactor function ke ES6 Arrow Function
   * - Refactor string ke ES6 Template Literals
   */

  /**
 * Fungsi untuk menampilkan hasil download
 * @param {string} result - Nama file yang didownload
 */
const showDownload = (result) => {
  console.log("Download selesai");
  console.log(`Hasil Download: ${result}`);
};

/**
* Fungsi untuk download file
* @returns {Promise<string>} - Promise yang menyelesaikan dengan nama file yang didownload
*/
const download = () => {
  return new Promise((resolve) => {
      setTimeout(() => {
          const result = "windows-10.exe";
          resolve(result);
      }, 3000); // Simulasi waktu download 3 detik
  });
};

// Menggunakan Async/Await untuk memanggil fungsi download
const initiateDownload = async () => {
  const result = await download();
  showDownload(result);
};

// Memulai proses download
initiateDownload();
