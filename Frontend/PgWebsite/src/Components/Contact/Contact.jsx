import React from 'react'
import './Contact.css'
import message_icon from '../../assets/msg-icon.png'
import mail_icon from '../../assets/mail-icon.png'
import phone_icon from '../../assets/phone-icon.png'
import location_icon from '../../assets/location-icon.png'
import white_arrow from '../../assets/white-arrow.png'

const Contact = () => {
    const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "afc015dd-d3c6-441f-b699-83ea6e240ab1");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();

    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };
    return (
        <div className='contact'>
            <div className='contact-col'>
                <h3>Let's Connect – Drop Us a Message <img src={message_icon} alt='Message Icon' /> </h3>
                <p>Looking for a comfortable and affordable PG in Pune? Feel free to reach out to us for any inquiries, bookings, or assistance. Your satisfaction is our priority, and we're here to help you find the perfect stay.</p>
                <ul>
                    <li><img src={mail_icon} alt='' />Contact@YourPGWebsite.com</li>
                    <li><img src={phone_icon} alt='' />+91 98765-43210</li>
                    <li><img src={location_icon} alt='' />123, ABC Road, Pune, Maharashtra, India</li>
                </ul>
            </div>
            <div className='contact-col'>
                <form onSubmit={onSubmit}>
                    <label>Your name</label>
                    <input type="text" name="name" placeholder="Enter your name" required />

                    <label>Phone Number</label>
                    <input type="tel" name="phone" placeholder="Enter your mobile number" required />

                    <label>Write your messages here</label>
                    <textarea name="message" rows="6" placeholder="Enter your message" required></textarea>

                    <button type="submit" className="btn dark-btn">Submit now <img src={white_arrow} alt='White Arrow'/> </button>
                </form>
                <span>{result}</span>
            </div>
        </div>
    )
}

export default Contact
