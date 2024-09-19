document.addEventListener('DOMContentLoaded', function() {
    const otpInputs = document.querySelectorAll('.otp-input');
    const verifyButton = document.getElementById('verifyOtp');
    const resendButton = document.getElementById('resendOtp');

    otpInputs[0].focus();

    otpInputs.forEach((input, index) => {
        input.addEventListener('input', function(e) {
            const value = e.target.value;
            
            if (value.length === 1) {
                if (index < otpInputs.length - 1) {
                    otpInputs[index + 1].focus();
                }
            }
        });

        input.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && e.target.value.length === 0) {
                if (index > 0) {
                    otpInputs[index - 1].focus();
                }
            }
        });
    });

    verifyButton.addEventListener('click', function(e) {
        e.preventDefault();
        const otp = Array.from(otpInputs).map(input => input.value).join('');
        console.log('Verifying OTP:', otp);
    });

    resendButton.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Resending OTP');
    });
});