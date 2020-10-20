<template>
  <input
    type="file"
    @change="modifyFile"
  />
</template>
<script>
  export default {
    data() {
      return {
        file: '',
      };
    },
    methods: {
      modifyFile(file) {
        const {
          target: {
            files: [uploadFile]
          }
        } = file;
        const size = uploadFile.size;
        console.log(size %9);
        console.log(this.slice(uploadFile, (size > 500*1024*1024) ? (size /10): 1024 * 1024 * 50));
              
      },
      slice(file, piece = 1024 * 1024 * 50) {
      let totalSize = file.size; // 文件总大小
      let start = 0; // 每次上传的开始字节
      let end = start + piece; // 每次上传的结尾字节
      let chunks = []
      while (start < totalSize) {
        // 根据长度截取每次需要上传的数据
        // File对象继承自Blob对象，因此包含slice方法
        let blob = file.slice(start, end); 
        chunks.push(blob)
        start = end;
        end = start + piece;
      }
      return chunks
    }
    },
    
  }
</script>