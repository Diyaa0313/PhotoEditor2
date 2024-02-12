document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
});

let img = new Image();
let fileName = "";

const downloadBtn = document.getElementById("download-btn");
const uploadFile = document.getElementById("upload-file");
const revertBtn = document.getElementById("revert-btn");

// Additional variables for drawing tools
let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Event listeners for mouse actions
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);

// Drawing tool functions
function startDrawing(e) {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
}

function draw(e) {
  if (!isDrawing) return;
  ctx.lineWidth = 5; // Set your desired line width
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.strokeStyle = "#089496"; // Set your desired stroke color

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();

  [lastX, lastY] = [e.offsetX, e.offsetY];
}

function stopDrawing() {
  isDrawing = false;
}

// Filter & Effect Handlers
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("filter-btn")) {
    if (e.target.classList.contains("brightness-add")) {
      Caman("#canvas", img, function () {
        this.brightness(5).render();
      });
    } else if (e.target.classList.contains("brightness-remove")) {
      Caman("#canvas", img, function () {
        this.brightness(-5).render();
      });
    } else if (e.target.classList.contains("contrast-add")) {
      Caman("#canvas", img, function () {
        this.contrast(5).render();
      });
    } else if (e.target.classList.contains("contrast-remove")) {
      Caman("#canvas", img, function () {
        this.contrast(-5).render();
      });
    } else if (e.target.classList.contains("saturation-add")) {
      Caman("#canvas", img, function () {
        this.saturation(5).render();
      });
    } else if (e.target.classList.contains("saturation-remove")) {
      Caman("#canvas", img, function () {
        this.saturation(-5).render();
      });
    } else if (e.target.classList.contains("vibrance-add")) {
      Caman("#canvas", img, function () {
        this.vibrance(5).render();
      });
    } else if (e.target.classList.contains("vibrance-remove")) {
      Caman("#canvas", img, function () {
        this.vibrance(-5).render();
      });
    } else if (e.target.classList.contains("vintage-add")) {
      Caman("#canvas", img, function () {
        this.vintage().render();
      });
    } else if (e.target.classList.contains("lomo-add")) {
      Caman("#canvas", img, function () {
        this.lomo().render();
      });
    } else if (e.target.classList.contains("clarity-add")) {
      Caman("#canvas", img, function () {
        this.clarity().render();
      });
    } else if (e.target.classList.contains("sincity-add")) {
      Caman("#canvas", img, function () {
        this.sinCity().render();
      });
    } else if (e.target.classList.contains("crossprocess-add")) {
      Caman("#canvas", img, function () {
        this.crossProcess().render();
      });
    } else if (e.target.classList.contains("pinhole-add")) {
      Caman("#canvas", img, function () {
        this.pinhole().render();
      });
    } else if (e.target.classList.contains("nostalgia-add")) {
      Caman("#canvas", img, function () {
        this.nostalgia().render();
      });
    } else if (e.target.classList.contains("hermajesty-add")) {
      Caman("#canvas", img, function () {
        this.herMajesty().render();
      });
    }
  }

  if (e.target.classList.contains("draw-tool")) {
    canvas.style.cursor = "crosshair";
    canvas.removeEventListener("click", handleFilterClick); // Remove filter event listener
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);
  } else {
    canvas.style.cursor = "default";
    canvas.addEventListener("click", handleFilterClick); // Restore filter event listener
    canvas.removeEventListener("mousedown", startDrawing);
    canvas.removeEventListener("mousemove", draw);
    canvas.removeEventListener("mouseup", stopDrawing);
    canvas.removeEventListener("mouseout", stopDrawing);
  }
});

// Revert Filters
revertBtn.addEventListener("click", (e) => {
  Caman("#canvas", img, function () {
    this.revert();
  });
});

// Upload File
uploadFile.addEventListener("change", () => {
  // Get File
  const file = document.getElementById("upload-file").files[0];
  // Init FileReader API
  const reader = new FileReader();

  // Check for file
  if (file) {
    // Set file name
    fileName = file.name;
    // Read data as URL
    reader.readAsDataURL(file);
  }

  // Add image to canvas
  reader.addEventListener(
    "load",
    () => {
      // Create image
      img = new Image();
      // Set image src
      img.src = reader.result;
      // On image load add to canvas
      img.onload = function () {
        console.log("Image loaded");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, img.height, img.width);
        console.log("Image drawn to canvas");
        canvas.removeAttribute("data-caman-id");
      };
      img.onerror = () => {
        console.error("Image failed to load");
        console.error("provided file couldnt be loaded as image media");
      };
    },
    false
  );
});

// Download Event
downloadBtn.addEventListener("click", () => {
  // Get ext
  const fileExtension = fileName.slice(-4);

  // Init new filename
  let newFilename;

  // Check image type
  if (fileExtension === ".jpg" || fileExtension === ".png") {
    // new filename
    newFilename = fileName.substring(0, fileName.length - 4) + "-edited.jpg";
  }

  // Call download
  download(canvas, newFilename);
});

// Download
function download(canvas, filename) {
  // Init event
  let e;
  // Create link
  const link = document.createElement("a");

  // Set props
  link.download = filename;
  link.href = canvas.toDataURL("image/jpeg", 1);
  // New mouse event
  e = new MouseEvent("click");
  // Dispatch event
  link.dispatchEvent(e);
}
