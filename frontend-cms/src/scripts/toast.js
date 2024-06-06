// const toastTrigger = document.getElementById("liveToastBtn");
// const toastLiveExample = document.getElementById("liveToast");

// if (toastTrigger) {
//   const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
//   toastTrigger.addEventListener("click", () => {
//     toastBootstrap.show();
//   });
// }

// let clickTrigger = setInterval(() => {
//   toastTrigger.click();
// }, 35000);

// function handleApplyJob(e) {
//   document.getElementById("jodid").value = e.dataset.jobId;
//   //check login here
//   if (!document.getElementById("login-user-btn")) {
//     $("#apply_job").modal("show");
//   } else {
//     document.getElementById("login-user-btn").click();
//   }
// }

// <script>
//   document.getElementById('signup-form').addEventListener('submit', function(event) {
//       event.preventDefault();

//       const username = document.getElementById('username').value;
//       const password = document.getElementById('password').value;
//       const cpassword = document.getElementById('cpassword').value;

//       if (password !== cpassword) {
//           showAlert('Passwords do not match', 'danger');
//           return;
//       }

//       const requestBody = {
//           username: username,
//           password: password,
//           cpassword: cpassword
//       };

//       fetch('/api/signup', {
//           method: 'POST',
//           headers: {
//               'Content-Type': 'application/json'
//           },
//           body: JSON.stringify(requestBody)
//       })
//       .then(response => response.json())
//       .then(data => {
//           if (data.success) {
//               window.location.href = './index.html';
//           } else {
//               showAlert(data.message, 'danger');
//           }
//       })
//       .catch(error => {
//           showAlert('An error occurred during signup. Please try again.', 'danger');
//           console.error('Error:', error);
//       });
//   });

//   function showAlert(message, type) {
//       const alertContainer = document.getElementById('alert-container');
//       const alert = document.createElement('div');
//       alert.className = `alert alert-${type} alert-dismissible fade show`;
//       alert.role = 'alert';
//       alert.innerHTML = `
//           ${message}
//           <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
//       `;
//       alertContainer.appendChild(alert);
//   }
// </script>
