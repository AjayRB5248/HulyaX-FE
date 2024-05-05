import Image from "next/image";
import SuccessImg from "src/assets/illustrations/Confirmed attendance-pana.png";

const BookingSuccess = () => {
  return (
    <section className="success-booking-page">
      <div className="container-fluid text-center">
        <Image src={SuccessImg} alt={"Ticket Booking Success Image"} height={400} />
        <p className="confirmation-title">Booking confirmed successfully!</p>
        <p className="message">
          Thank you for choosing to book tickets with Hulya Events! Your reservation is confirmed. If there's anything
          you need before your arrival, please don't hesitate to reach out to your host!
        </p>

        <button className="theme-button view-tickets-btn">View Your Tickets</button>
      </div>
    </section>
  );
};

export default BookingSuccess;
