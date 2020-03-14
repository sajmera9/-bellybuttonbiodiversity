// Display the Default Bar Chart and Bubble Plot
// Display default metadata
function init(){
  d3.json("samples.json").then(function(data) {
    //Fill values into the dropdown menu
    console.log(data);
    var dropdown_values = d3.select("#selDataset");
    var data_names = data.names;
    data_names.forEach(function(name){
      dropdown_values.append("option").text(name)
    })
    
    // Assign default metadata values to a variable
    var sample_metadata_id = data.metadata[0]['id'];
    var sample_metadata_ethnicity = data.metadata[0]['ethnicity'];
    var sample_metadata_gender = data.metadata[0]['gender'];
    var sample_metadata_age = data.metadata[0]['age'];
    var sample_metadata_location = data.metadata[0]['location'];
    var sample_metadata_bbtype = data.metadata[0]['bbtype'];
    var sample_metadata_wfreq = data.metadata[0]['wfreq'];
    
    //Use d3 to select the `sample-metadata` id and append a `div` for each variable
    var meta_data = d3.select("#sample-metadata");
    var div = meta_data.append("div");
    div.append("div").text(`id: ${sample_metadata_id}`);
    div.append("div").text(`ethnicity: ${sample_metadata_ethnicity}`);
    div.append("div").text(`gender: ${sample_metadata_gender}`);
    div.append("div").text(`age: ${sample_metadata_age}`);
    div.append("div").text(`location: ${sample_metadata_location}`);
    div.append("div").text(`bbtype: ${sample_metadata_bbtype}`);
    div.append("div").text(`wfreq: ${sample_metadata_wfreq}`);

    //default values for sample 940
    var sample_values = data.samples[0]['sample_values'];
    var otu_ids = data.samples[0]['otu_ids'];
    var otu_labels = data.samples[0]['otu_labels'];
    
    // Default values sliced to get top ten values
    var top_ten_sample_values = sample_values.slice(0, 10);
    var top_ten_otu_ids = otu_ids.slice(0, 10);
    var top_ten_otu_labels = otu_labels.slice(0, 10);
    
    //Used a for-loop to append the sliced OTU ids to an empty list `renamed_top_ten_otu_ids`that will allows a string to be placed in front of each otu id, so plotly doesn't read each sample value as a integer.
    
    renamed_top_ten_otu_ids = [];
    for (var i = 0; i < top_ten_otu_ids.length; i++) {
      renamed_top_ten_otu_ids.push("OTU " + top_ten_otu_ids[i]);
    }
    // console.log(renamed_top_ten_otu_ids);
    
    //Default bar chart
    var default_bar = [{
      x: top_ten_sample_values,
      y: renamed_top_ten_otu_ids,
      type: "bar",
      orientation: 'h'
    }];
    var default_bar_layout = {
      title: "Bar Chart"
    }

    //Default bubble chart
    var default_bubble = [{
      x: otu_ids,
      y: sample_values,
      mode: 'markers',
      marker: {
        size: sample_values,
        color: [otu_ids],
      }
    }];
    var default_bubble_layout = {
      title: "Bubble Chart"
    }
    
    Plotly.newPlot("bar", default_bar, default_bar_layout);
    Plotly.newPlot("bubble", default_bubble, default_bubble_layout);
  });

}
init();


//Create function to show updated graphs
function updatePage() {
  d3.json("samples.json").then(function(data){
    d3.select("#sample-metadata").selectAll("div").text("");
    
    var sample_values = data.samples;
    var sample_metadata = data.metadata;
    var dropdownMenu = d3.selectAll("#selDataset").node();
    var selectedOption = dropdownMenu.value;
    console.log(selectedOption);
    
    //Create a filter to show sample data using the selectedOption to get the metadata 
    var chosenMetadata = sample_metadata.filter(function(meta){
        return meta.id == selectedOption
    });
    //console.log(chosenMetadata);
    //Get values for the metadata and assigned it to a variable
    var sample_metadata_id = chosenMetadata[0]['id'];
    var sample_metadata_ethnicity = chosenMetadata[0]['ethnicity'];
    var sample_metadata_gender = chosenMetadata[0]['gender'];
    var sample_metadata_age = chosenMetadata[0]['age'];
    var sample_metadata_location = chosenMetadata[0]['location'];
    var sample_metadata_bbtype = chosenMetadata[0]['bbtype'];
    var sample_metadata_wfreq = chosenMetadata[0]['wfreq'];
    
    //Use d3 to select the `sample-metadata` id and append a `div` for each variable
    var meta_data = d3.select("#sample-metadata");
    meta_data.append("div").text(`id: ${sample_metadata_id}`);
    meta_data.append("div").text(`ethnicity: ${sample_metadata_ethnicity}`);
    meta_data.append("div").text(`gender: ${sample_metadata_gender}`);
    meta_data.append("div").text(`age: ${sample_metadata_age}`);
    meta_data.append("div").text(`location: ${sample_metadata_location}`);
    meta_data.append("div").text(`bbtype: ${sample_metadata_bbtype}`);
    meta_data.append("div").text(`wfreq: ${sample_metadata_wfreq}`);
    
    // Create a filter to show sample data using the selectedOption to get the sample_values 
    var chosenID = sample_values.filter(function(ident){
        return ident.id == selectedOption
    });
    //console.log(chosenID);
    
    // Given values for both bar chart and bubble chart and assigned it to a variable
    var updated_sample_values = chosenID[0]["sample_values"];
    var updated_otu_ids = chosenID[0]["otu_ids"];
    var updated_otu_labels = chosenID[0]["otu_labels"];
    
    //Sliced Values for bar chart
    var sliced_sample_values = chosenID[0]["sample_values"].slice(0, 10);
    var sliced_otu_ids = chosenID[0]["otu_ids"].slice(0, 10);
    var sliced_otu_labels = chosenID[0]["otu_labels"].slice(0, 10);
    
    //Used a for-loop to append the sliced OTU ids to an empty list `renamed_updated_otu_ids`that will allows a string to be placed in front of each otu id, so plotly doesn't read each sample value as a integer.
    renamed_updated_otu_ids = []
    for (var i = 0; i < sliced_otu_ids.length; i++) {
      renamed_updated_otu_ids.push("OTU " + sliced_otu_ids[i]);
    }
    //Default bar chart
    var default_bar = [{
      x: sliced_sample_values,
      y: renamed_updated_otu_ids,
      type: "bar",
      orientation: 'h'
    }];
    var default_bar_layout = {
      title: "Bar Chart"
    }
    
    //Default Bubble Chart
    var default_bubble = [{
      x: updated_otu_ids,
      y: updated_sample_values,
      mode: 'markers',
      marker: {
        size: updated_sample_values,
        color: updated_otu_ids,
      }
    }];
    var default_bubble_layout = {
      title: "Bubble Chart",
    }
    
    Plotly.newPlot("bar", default_bar, default_bar_layout);
    Plotly.newPlot("bubble", default_bubble, default_bubble_layout);
  });
};



updatePage();
d3.selectAll("#selDataset").on("change", updatePage);

