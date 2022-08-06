function Reviews() {
  //const newLocal = 'fa fa-chevron-left'
  return (
    <div id="reviews">
      <div className="review container mt-5">
        <div
          id="testimonial_095"
          className="carousel slide testimonial_095_indicators testimonial_095_control_button thumb_scroll_x swipe_x ps_easeOutSine"
          data-ride="carousel"
          data-pause="hover"
          data-interval="5000"
          data-duration="2000"
        >
          <div className="testimonial_095_header">
            <h5>
              Three Themes of <span>Azadi Ka Amrit Mahotsav</span>
            </h5>
          </div>
          <ol className="carousel-indicators">
            <li
              data-target="#testimonial_095"
              data-slide-to="0"
              className="active"
            ></li>
            <li data-target="#testimonial_095" data-slide-to="1"></li>
            <li data-target="#testimonial_095" data-slide-to="2"></li>
          </ol>
          <div className="carousel-inner" role="listbox">
            <div className="carousel-item active">
              <div className="testimonial_095_slide">
                {' '}
                <p>
                  The aim is to make the country and its citizens independent
                  and self-reliant in all senses. He further outlined five
                  pillars of Aatma Nirbhar Bharat – Economy, Infrastructure,
                  System, Vibrant Demography and Demand.
                </p>
                <h5>
                  <a href="#">AatmaNirbhar Bharat</a>
                </h5>
              </div>
            </div>
            <div className="carousel-item">
              <div className="testimonial_095_slide">
                {' '}
                <p>
                  The program showcased how digital technology has triggered
                  innovation and India’s achievements in the digital space. It
                  also highlighted how Digital technologies are transforming all
                  sectors of the economy and impacting our socio-cultural,
                  political and economic identity and fuel the spirit of
                  self-reliance in the Digital sector.
                </p>
                <h5>
                  <a href="#">Azadi Ka Digital Mahotsav</a>
                </h5>
              </div>
            </div>
            <div className="carousel-item">
              <div className="testimonial_095_slide">
                {' '}
                <p>
                  During the 'Azadi ka Amrit Mahotsav', events, exhibitions
                  (online and offline), publications, and develop museums
                  keeping the unsung or unacknowledged heroes of the Indian
                  freedom struggle will be planned. Many freedom fighters do not
                  find place in the conventional freedom movement storyline.
                </p>
                <h5>
                  <a href="#">Celebrating Unsung Heroes</a>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reviews
