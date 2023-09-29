// Function to add comments
function addComments(duplexStream) {
  setInterval(() => {
    duplexStream.write(`from submodule: ${new Date()}\n`);
  }, 500);
}
module.exports = {
  addComments,
};
