<?php
/**
 * Template Name: Gallery Page
 */

get_header();
?>
<?php //wp_head(); ?>

<style>
#main-content .container:before {
  content: '';
  position: relative !important ;
}
.ad{ margin-left:100px}

@media handheld, only screen and (max-width: 990px) {
.ad{ margin-left:0px}

}
</style>






<div id="main-content"   >
	<div class="container"   >

			<?php if(!isset($_REQUEST["id"])){ ?>
         	<!--<h2><?php //echo get_the_title();?></h2>-->

            <div class="ad clearfix" style="width:100%;margin-left:10px;">

            <!--<img src="http://myhouse.360emedia.info/wp-content/uploads/2015/06/TEAM-PHOTO.png"  />			-->
          	<br />
            <?php } ?>

			<?php
			//echo do_shortcode( '[huge_it_gallery id="4"]' );
			?>

			<?php the_content();?>

           </div>


	</div>
</div>

<?php get_footer(); ?>