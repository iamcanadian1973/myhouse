<?php



/**



 * Template Name: Gallery Project Page



 */



if (get_query_var('lightbox')) {



	get_header('lightbox');	



}



else {



	get_header();



}



?>



<?php 

$template_directory_uri = get_template_directory_uri();

$template_directory_uri = $template_directory_uri.'-child';

?>



<link rel='stylesheet' id='form_style_sheet1-css'  href='<?php echo esc_url( $template_directory_uri . '/flexslider/flexslider.css"' ); ?>' type='text/css' media='all' />



<link rel='stylesheet' id='form_style_sheet1-css'  href='<?php echo esc_url( $template_directory_uri . '/flexslider/flexslider-gallery.css"' ); ?>' type='text/css' media='all' />



<script src="<?php echo esc_url( $template_directory_uri . '/flexslider/jquery.flexslider.js"' ); ?>" type="text/javascript"></script>



<script type="text/javascript" src="http://w.sharethis.com/button/buttons.js"></script>



<script type="text/javascript">stLight.options({publisher: "2097f120-5afd-4f4a-a850-3b07ae176629", doNotHash: false, doNotCopy: false, hashAddressBar: false});</script>







<div id="main-content">



  <div id="content-area" class="gallery-project">



    <?php while ( have_posts() ) : the_post(); ?>



    <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>



      <h6 class="" style="text-align: right;">



        <a href="<?php echo $top_page_url = get_permalink( end( get_ancestors( get_the_ID(), 'page' ) ) );?>">back to gallery</a>



      </h6>



      <h1 class="main_title">



        <?php the_title(); ?>



      </h1>



      <?php 



					$postLink = get_permalink(get_the_ID());



					



					/*$socialMedia = "<ul class='gallery-social-icons'><li><a href='".$postLink."'><img src='".$template_directory_uri."/images/socialicons/facebook.png' alt='Facebook' /></a></li></ul>";*/







					



				?>



      <div class="gallery-project-images loading">



        <div id="slider" class="flexslider">



          <ul class="slides">



            <?php if (have_rows('photo_slideshow')){



						while (have_rows('photo_slideshow')){



							/*echo '<pre>';



							print_r(the_row());



							echo '</pre>';



							exit;*/



							



                    		echo '<li>';



							the_row();



							$slide_type = get_sub_field('slide_type');



							if ($slide_type == 'Single Photo') {



								$thumbnail_image = get_sub_field('single_photo');



								echo sprintf('<img src="%s" />', $thumbnail_image['sizes']['large'],'');								



							}



							else if ($slide_type == 'Interactive Before/After Slider'){



								$thumbnail_image = get_sub_field('before/after_slider_thumbnail');



								$before_image	 = get_sub_field('before_photo');	



								echo sprintf('<div class="before-image" style="display:none; position: absolute;"><img src="'.$before_image['sizes']['large'].'" /></div><div class="after-image"><img src="%s" /></div><a href="#" class="btn-toggle-beforeafter">See Before</a>', $thumbnail_image['sizes']['large'],'');



							}



							else if ($slide_type == 'Before/After') {



								$thumbnail_image = get_sub_field('after_photo');



								$before_image	 = get_sub_field('before_photo');	



								echo sprintf('<div class="before-image" style="display:none; position: absolute;"><img src="'.$before_image['sizes']['large'].'" /></div><div class="after-image"><img src="%s" /></div><a href="#" class="btn-toggle-beforeafter">See Before</a>', $thumbnail_image['sizes']['large'],'');



							}



							else if ($slide_type == 'Before/During/After') {



								$thumbnail_image = get_sub_field('after_photo');



								$before_image	 = get_sub_field('before_photo');	



								echo sprintf('<div class="before-image" style="display:none; position: absolute;"><img src="'.$before_image['sizes']['large'].'" /></div><div class="after-image"><img src="%s" /></div><a href="#" class="btn-toggle-beforeafter">See Before</a>', $thumbnail_image['sizes']['large'],'');



							}



							



							echo '</li>';



                  } }?>



          </ul>



        </div>



        <div id="carousel" class="flexslider">



          <ul class="slides">



            <?php if (have_rows('photo_slideshow')){



						while (have_rows('photo_slideshow')){ 



                    		echo '<li>';



							the_row();



							$slide_type = get_sub_field('slide_type');



							if ($slide_type == 'Single Photo') {



								$thumbnail_image = get_sub_field('single_photo');



								echo sprintf('<img src="%s" height="100px"/>', $thumbnail_image['sizes']['thumbnail'],'');								



							}



							else if ($slide_type == 'Interactive Before/After Slider'){



								$thumbnail_image = get_sub_field('before/after_slider_thumbnail');



								$before_image	 = get_sub_field('before_photo');	



								echo sprintf('<img src="%s" height="100px"/>', $thumbnail_image['sizes']['thumbnail'],'');



							}



							else if ($slide_type == 'Before/After') {



								$thumbnail_image = get_sub_field('after_photo');



								$before_image	 = get_sub_field('before_photo');	



								echo sprintf('<img src="%s" height="100px"/>', $thumbnail_image['sizes']['thumbnail'],'');



							}



							else if ($slide_type == 'Before/During/After') {



								$thumbnail_image = get_sub_field('after_photo');



								$before_image	 = get_sub_field('before_photo');	



								echo sprintf('<img src="%s" height="100px"/></a>', $thumbnail_image['sizes']['thumbnail'],'');



							}



							



							echo '</li>';



                  } }?>



          </ul>



        </div>



      </div>



        <div class='gallery-project-social-icons'>



            <span class='st_facebook_custom' displayText='Facebook'></span>



            <span class='st_twitter_custom' displayText='Tweet'></span>



            <span class='st_googleplus_custom' displayText='Google +'></span>



            <span class='st_linkedin_custom' displayText='LinkedIn'></span>



            <span class='st_pinterest_custom' displayText='Pinterest'></span>



            <span class='st_instagram_custom' displayText='Instagram Badge'></span>



            <a target="_blank" href="http://www.houzz.com/pro/myhousedesignbuildteam"><span class='st_houzz_custom'></span></a>



            <a target="_blank" href="http://mp.weixin.qq.com/mp/getmasssendmsg?__biz=MzA5MDkyMzc3OA==&uin=NDk1NTk5NzM1&key=c76941211a49ab589488eccd27eef7491875b97965c34d72ce0fd40ff20609bae4ef2c3c9570b38b5446be1e6464ac48&devicetype=Windows+7&version=61020020&lang=en&pass_ticket=JwIG97ASJtUr9VB7opcmlxkLBVYhrE%2F35Wyyd7PfGWdcE1EPPzz3ieX9RrAKL5Eq#wechat_webview_type=1"><span class='st_wechat_custom'></span></a>



        </div>



      <?php



      	$longDescription = get_field('long_description');



		if($longDescription!=''){



	  ?>



      <div class="description">



        <?php the_field('long_description'); ?>



      </div>



      <?php }?>





      <?php if (have_rows('awards')): ?>



					<div class="awards-container">



						<?php while (have_rows('awards')): the_row(); ?>



							<div class="award">



								<?php $image = get_sub_field('award_image'); ?>



								<img src="<?php echo $image['url']; ?>" alt="<?php echo $image['alt']; ?>">



								



								<div class="copy">



									<strong><?php the_sub_field('award_title'); ?></strong>



									<p><?php the_sub_field('award_description'); ?></p>



								</div>



							</div>



						<?php endwhile; ?>



					</div>



                    <div style="clear:both; margin-bottom:10px;">&nbsp;</div>



				<?php endif; ?>



      <?php if (have_rows('youtube_videos')): ?>



        	<div class="videos-container">



            <?php while (have_rows('youtube_videos')): the_row(); ?>



                <div class="embed-videos">



                    <?php echo $videos = get_sub_field('embed_code'); ?>



                    



                </div>



            <?php endwhile; ?>



        	</div>



        <div style="clear:both; margin-bottom:10px;">&nbsp;</div>



    <?php endif; ?>



    </article>



    <!-- .et_pb_post -->



    



    <?php endwhile; ?>



  </div>



  <!-- #content-area --> 



  



</div>



<!-- #main-content --> 



<script type="text/javascript">



	var conflict = jQuery.noConflict();



	conflict(function(){



	  conflict('.btn-toggle-beforeafter').click(function(e){



		  e.preventDefault();



		  



		  //conflict('.flex-active-slide a').addClass("after");



		  conflict(this).text(function(_, oldText) {



			  if(oldText === 'See Before'){



				  conflict('.before-image').slideDown("slow");



				  conflict('.after-image').css('opacity','0.0');



			  }else{



				  conflict('.before-image').css('display','none');



				  conflict('.after-image').css('opacity','1.0');



				  //conflict('.before-image').slideUp("slow");



			  }



			  return oldText === 'See Before' ? 'See After' : 'See Before';



		  });



	  });



    });



    conflict(window).load(function(){



      conflict('#carousel').flexslider({



        animation: "slide",



        controlNav: false,



        animationLoop: false,



        slideshow: false,



        itemWidth: 150,



        itemMargin: 5,



        asNavFor: '#slider',



		start: function(slider){



		  conflict('.slides li img').on('click',function(){



			  conflict('.before-image').css('display','none');



			  conflict('.after-image').css('opacity','1.0');



			  conflict('.btn-toggle-beforeafter').text('See Before');



		  });



		  conflict('.flex-prev').on('click',function(){



			  conflict('.before-image').css('display','none');



			  conflict('.after-image').css('opacity','1.0');



			  conflict('.btn-toggle-beforeafter').text('See Before');



		  });



		  conflict('.flex-next').on('click',function(){



			  conflict('.before-image').css('display','none');



			  conflict('.after-image').css('opacity','1.0');



			  conflict('.btn-toggle-beforeafter').text('See Before');



		  });



        }



      });







      conflict('#slider').flexslider({



        animation: "slide",



        controlNav: false,



        animationLoop: false,



        slideshow: false,



        sync: "#carousel",



        start: function(slider){



          conflict('.gallery-project-images').removeClass('loading');



		  conflict('.flex-prev').on('click',function(){



			  conflict('.before-image').css('display','none');



			  conflict('.btn-toggle-beforeafter').text('See Before');



		  });



		  conflict('.flex-next').on('click',function(){



			  conflict('.before-image').css('display','none');



			  conflict('.btn-toggle-beforeafter').text('See Before');



		  });



        }



      });



    });



  </script>



<?php 



if (get_query_var('lightbox')) {



	get_footer('lightbox');	



}



else {



	get_footer();



}



?>